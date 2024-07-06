"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const data = {
    users: [
        {
            name: 'Djesu',
            email: 'djesu@yahoomail.com',
            password: bcryptjs_1.default.hashSync('1234', 8),
            isAdmin: true,
        },
        /*    {
             name: 'John',
             email: 'user111@example.com',
             password: bcrypt.hashSync('7654', 8),
             isAdmin: false,
           },
           ,
           {
             name: 'Paul',
             email: 'pfleischer2002@yahoo.co.uk',
             password: bcrypt.hashSync('1234', 8),
             isAdmin: false,
           }, */
    ],
    services: [
        {
            category: 'Nike Slim Shirt',
            name: 'Shirts',
            owner: 'Paul Abban',
            owneraddress: 'P O Box 34, Accra',
            ownertelno: '0245678900',
            image: '/images/p1.jpg',
            unitPrice: 120,
            rating: 4.5,
            numReviews: 10,
        },
        {
            category: 'Adidas Fit Shirt',
            name: 'Shirts',
            owner: 'Paul Abban',
            owneraddress: 'P O Box 34, Accra',
            ownertelno: '0245678900',
            image: '/images/p2.jpg',
            unitPrice: 100,
            rating: 4.0,
            numReviews: 10,
        },
        {
            category: 'Lacoste Free Shirt',
            name: 'Shirts',
            owner: 'Paul Abban',
            owneraddress: 'P O Box 34, Accra',
            ownertelno: '0245678900',
            image: '/images/p3.jpg',
            unitPrice: 220,
            rating: 4.8,
            numReviews: 17,
        },
        {
            category: 'Nike Slim Pant',
            name: 'Pants',
            owner: 'Paul Abban',
            owneraddress: 'P O Box 34, Accra',
            ownertelno: '0245678900',
            image: '/images/p4.jpg',
            unitPrice: 78,
            rating: 4.5,
            numReviews: 14,
        },
        {
            category: 'Puma Slim Pant',
            name: 'Pants',
            owner: 'Paul Abban',
            owneraddress: 'P O Box 34, Accra',
            ownertelno: '0245678900',
            image: '/images/p5.jpg',
            unitPrice: 65,
            rating: 4.5,
            numReviews: 10,
        },
        {
            category: 'Adidas Fit Pant',
            name: 'Pants',
            owner: 'Paul Abban',
            owneraddress: 'P O Box 34, Accra',
            ownertelno: '0245678900',
            image: '/images/p6.jpg',
            unitPrice: 139,
            rating: 4.5,
            numReviews: 15,
        },
    ],
};
exports.default = data;
