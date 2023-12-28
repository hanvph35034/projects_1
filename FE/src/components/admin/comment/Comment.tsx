import { useState } from "react";
import { LiaCommentsSolid } from 'react-icons/lia'
import { BsClock } from 'react-icons/bs'
import "./Comment.css"
import Comment_Rely from "./Comment_Rely";
const Comment = () => {
    const [comment, setComment] = useState(false);
    const handlRely = () => {
        setComment(!comment)
    }
    return (
        <>
            <h1 className="my-5 text-xl font-medium">Bình Luận</h1>
            <div className=" shadow-content-comment content min-h-[200px] w-full rounded-lg p-5">
                <div className="comment-user">
                    <div className="inp-question-user">
                        <Comment_Rely />
                    </div>
                    {comment &&
                        <Comment_Rely />
                    }
                </div>
            </div>
        </>
    )
}

export default Comment