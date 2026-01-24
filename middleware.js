const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError=require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to access that page");
        return res.redirect("/login");
    } 
    next();
};
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (
        !listing ||
        !listing.owner ||
        listing.owner.toString() !== res.locals.currUser._id.toString()
    ) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
  if (error) {
  const msg = error.details.map(el => el.message).join(",");
  throw new ExpressError(msg, 400);
 }
   
    else{
        next();
    }
};


module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
 
    if (error) {
  const msg = error.details.map(el => el.message).join(",");
  throw new ExpressError(msg, 400);
}else{
        next();
    }
};
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (
        !review ||
        !review.author ||
        review.author.toString() !== res.locals.currUser._id.toString()
    ) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

