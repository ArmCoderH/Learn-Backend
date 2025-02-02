import mongoose from 'mongoose';

const likeSchema = mongoose.Schema(
{
    vidoe : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Video'
    },
    comment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    },
    tweet : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Tweet'
    },
    likeBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},
{
    timestamps : true,
}
)


export const Like = mongoose.model('Like',likeSchema)