import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
    {
        name: "John Doe",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        feedback: "This app changed how I manage my finances! Highly recommend it.",
    },
    {
        name: "Sarah Smith",
        photo: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        feedback: "Great tool for tracking expenses and setting savings goals!",
    },
    {
        name: "Michael Lee",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        feedback: "Simple, efficient, and user-friendly. Love the UI!",
    },
    {
        name: "Emily Johnson",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 4.5,
        feedback: "Perfect for budgeting and tracking my spending habits!",
    },
    {
        name: "Chris Brown",
        photo: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 5,
        feedback: "The best financial tracking app I've used so far!",
    },
];

function Testimonials() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 4000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        arrows: false,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024, // For tablets
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // For mobile screens
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-12">
            <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
            <div className="max-w-6xl mx-auto">
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="px-2 sm:px-4">
                            <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
                                <img
                                    src={testimonial.photo}
                                    alt={testimonial.name}
                                    className="w-20 h-20 mx-auto rounded-full border-2 border-blue-500 mb-4"
                                />
                                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                <div className="flex justify-center my-2">
                                    {Array.from({ length: testimonial.rating }, (_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm sm:text-base">{testimonial.feedback}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Testimonials;
