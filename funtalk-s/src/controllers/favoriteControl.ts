import { Custom_Request } from './../middleware/middleware.types.d';
import { Request, Response } from 'express';
import { commonly_used } from 'utilities';
import Favorite_list from 'models/favoritList';
import { FavoritList_DocType } from 'models/models.types';

const { err_response } = commonly_used;

const get_favoritList = async (req: Request, res: Response) => {
    try {
        const favorite_list = await Favorite_list.find();
        res.json(favorite_list);
    } catch (err) {
        err_response(res, err);
    }
};

const create_favoriteList = async (req: Custom_Request<FavoritList_DocType>, res: Response) => {
    try {
        //1. get the title name
        const { name } = req.body;

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

export { get_favoritList, create_favoriteList };
