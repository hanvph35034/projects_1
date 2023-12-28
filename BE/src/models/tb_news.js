import mongoose from "mongoose";
const newsSchema = new mongoose.Schema(
    {
        tieude:String,
        noidung:String,
        image: Array,
        trang_thai:String

    },
    { timestamps: { currentTime: () => Date.now() + 7 * 60 * 60 * 1000 }, versionKey: false }
);

export default mongoose.model("News", newsSchema);
