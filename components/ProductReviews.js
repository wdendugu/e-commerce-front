import StartsRating from "./StarsRating";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductReviews ({product}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [stars, setStars] = useState(0)
    const [reviews, setReviews] = useState([])

    function getReviews () {
        axios.get('/api/reviews?product='+product._id).then(res =>  {
            setReviews(res.data)
        })
    }

    function submitReview () {
        const data =  {title,description,stars,product:product._id}
        axios.post('/api/reviews', data).then (res => {
            alert('Ok')
            setTitle("")
            setDescription("")
            setStars(0)
            getReviews()
        })
    }

    useEffect (()=> getReviews(),[])


    return (
        <div className="pb-10">
            <h2 className="text-xl font-bold mb-1">Reviews</h2>
            <div className="grid-12-8">
                <div className="p-4 bg-white rounded-lg w-[90%] max-h-[270px]">
                    <h3 className="text-base font-bold mt-1 mb-4">Add a Review</h3>
                    <StartsRating onChange={setStars}/>
                    <input 
                        placeholder="Title" 
                        className="w-full border mt-3 rounded-md"
                        value={title}
                        onChange={ev=> setTitle(ev.target.value)}
                    >
                    </input>
                    <textarea 
                        placeholder="Was it good?" 
                        className="w-full border mt-3 rounded-md"
                        value={description}
                        onChange={ev=> setDescription(ev.target.value)}
                    >
                        
                    </textarea>
                    <div className="flex justify-end">
                        <button 
                            className="btn btn-productpage"
                            onClick={submitReview}
                        >
                            Submit your review
                        </button>
                    </div>
                </div>
                <div className="p-4 bg-white rounded-lg">
                    <h3 className="text-base font-bold mt-1 mb-4">All Reviews</h3>
                    {reviews.length === 0 && (<p>No reviews yet, be the first one</p>)}
                    {reviews.length > 0 && (
                        reviews.map(review => (
                            <div key={review._id} className="py-2 border-t-2 my-5">
                                <StartsRating defaulthowMany={review.stars} disabled={true}/>
                                <h4 className="text-xl font-bold my-1">{review.title}</h4>
                                <p className="text-md">{review.description}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}