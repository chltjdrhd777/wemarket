import { ImageInfo } from './controllers.types.d';
import { CustomRequest } from './../middleware/middleware.types.d';
import { Request, Response } from 'express';
import { commonly_used } from 'utilities';
import { firebaseFirestore, firebaseBucket } from 'firebase/firebase';
import { v4 as uuid } from 'uuid';

const { errResponse } = commonly_used;

const uploadImages = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];

        if (files.length === 0) {
            return res.status(400).json({ msg: 'not upload file or not valide fileType' });
        }

        //fireStore(DB) test
        await firebaseFirestore.collection('test').doc('testDoc').set({
            name: 'test data',
            value: 'it is test message'
        });

        //firebase storage upload
        const imgFiles = req.files as Express.Multer.File[];

        const uploadImg = imgFiles.map((eachImg) => {
            const imgName = `${uuid()}+${eachImg.originalname}`;
            const bucketReady = firebaseBucket.file(`categoryImgs/${imgName}`);

            return bucketReady.save(eachImg.buffer, {
                metadata: {
                    contentType: eachImg.mimetype,
                    metadata: {
                        firebaseStorageDownloadTokens: uuid()
                    }
                }
            });
        });

        Promise.all(uploadImg);

        //! if want to use direact file system, refer to things below
        // const promiseImgs = files.map((eachFile) =>
        //     firebaseBucket.upload(eachFile.path, {
        //         destination: `categoryImg/${eachFile.filename}`,
        //         metadata: {
        //             metadata: {
        //                 firebaseStorageDownloadTokens: uuid()
        //             }
        //         }
        //     })
        // );

        // Promise.all(promiseImgs);

        res.json({ fileinfo: 'work' });
    } catch (err) {
        errResponse(res, err);
    }
};

const deleteImages = async (req: CustomRequest<{}, {}, ImageInfo>, res: Response) => {
    try {
        const { name } = req.body;
        await firebaseBucket.file(`categoryImgs/${name}`).delete();
        res.json({ msg: 'image deleted successfully' });
    } catch (err) {
        errResponse(res, err);
    }
};

export { uploadImages, deleteImages };
