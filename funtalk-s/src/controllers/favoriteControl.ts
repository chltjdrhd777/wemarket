import { Custom_Request } from './../middleware/middleware.types.d';
import { Request, Response } from 'express';
import { commonly_used } from 'utilities';
import Favorite_list from 'models/favoritList';
import { FavoritList_DocType } from 'models/models.types';
import { bucket } from 'upload/firebase';
import { v4 as uuid } from 'uuid';

const { err_response } = commonly_used;

const get_favoritList = async (req: Request, res: Response) => {
    try {
        const favorite_list = await Favorite_list.find();
        res.json(favorite_list);
    } catch (err) {
        err_response(res, err);
    }
};

const create_favoriteList = async (
    req: Custom_Request<{}, {}, FavoritList_DocType>,
    res: Response
) => {
    try {
        //1. get the title name
        const { name } = req.body;
        if (!name) return res.status(400).json({ msg: 'name please' });

        //2. find one
        const target_favorite = await Favorite_list.findOne({ name });
        if (target_favorite) return res.status(400).json({ msg: 'already exist' });

        //3. make new favorite and save
        const newFavorite_data: FavoritList_DocType = { name };
        const newFavorite = new Favorite_list(newFavorite_data);
        await newFavorite.save();

        res.json({ msg: 'new favorite created' });
    } catch (err) {
        err_response(res, err);
    }
};

const delete_favoriteList = async (req: Custom_Request<{ id: string }>, res: Response) => {
    try {
        //find favorite by Object id and delete it
        await Favorite_list.findByIdAndDelete(req.params.id);
        res.json({ msg: 'deleted successfully' });
    } catch (err) {
        err_response(res, err);
    }
};

const update_favoriteList = async (
    req: Custom_Request<{ id: string }, {}, FavoritList_DocType>,
    res: Response
) => {
    try {
        //receive change data and apply this to favorite found by id
        const { name } = req.body;
        if (!name) return res.status(400).json({ msg: 'name plaese' });

        await Favorite_list.findByIdAndUpdate(req.params.id, { name });
        res.json({ msg: 'updated successfully' });
    } catch (err) {
        err_response(res, err);
    }
};

const upload_favoriteIMGs = async (req: Request, res: Response) => {
    //1. get img array
    const imgs = req.files as Express.Multer.File[];

    //2. test img target
    const img = imgs[0];
    const { buffer, originalname, ...rest } = img;
    const bucketFile = bucket.file(originalname);

    //ok final conclusion
    //there is no proper way to deal with buffer to file store in firebase world
    // the easiest way to do it is, from client, render their file to dataURL, and server utitlize it
    res.json({ img: rest });
};

export {
    get_favoritList,
    create_favoriteList,
    delete_favoriteList,
    update_favoriteList,
    upload_favoriteIMGs
};
