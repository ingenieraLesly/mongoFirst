import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publication: Date,
    public: String,
    description: String,
    secction: String,
    languaje: String,
    pages: Number,
    frontPageUrl: String,
    copies: Number,
    copyId: Number,
    available: Boolean,
    loanDate: Date,
    returnDate: Date,
    stateConservation: String,
    priceBook: Number,
    user: String,
    registerDate: { type: Date, default: Date.now },
    dbStatus: true
    //comments
});

const book = mongoose.model("books", bookSchema);
export default book;
