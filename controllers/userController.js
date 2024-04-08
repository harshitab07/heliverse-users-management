import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    fetch all users
// @route GET /api/users

const getUsers = asyncHandler(async (req, res) => {
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;
  
    // Search by keyword
    const keyword = req.query.keyword
    ? {
        $or: [
          { first_name: { $regex: req.query.keyword, $options: 'i' } },
          { last_name: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};
  
    // Filter by domain, gender, availability
    const filters = {};
    if (req.query.domain) {
      filters.domain = req.query.domain;
    }
    if (req.query.gender) {
      filters.gender = req.query.gender;
    }
    if (req.query.available) {
      filters.available = req.query.available;
    }

    const query = { ...keyword, ...filters };
  
    const count = await User.countDocuments(query);
  
    const users = await User.find(query).sort({ id : 1})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    
    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  });

  // @desc    Delete a product
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async(req,res) => {
    
    const user = await User.findById(req.params.id);

    if(user)
    {
       await User.deleteOne({ _id : user._id});
        res.status(200).json({message : 'user deleted'});
    }else{
        res.status(404);
        throw new Error('resource not found');
    }
});

// @desc    fetch a products
// @route GET /api/products/:id

const getUserById = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);

    if(user){
    return res.json(user);
    }
    else{
        res.status(404); 
        throw new Error('Resource not found');
    }
});

const createUser = asyncHandler(async(req,res) => {
    const user = new User({
        id: 0,
        first_name: 'sample first_name',
        last_name: 'sample last_name',
        email: 'sample@email.com',
        gender: 'sample gender',
        avatar: 'https://robohash.org/sintessequaerat.png?size=50x50&set=set1',
        domain: 'sample domain',
        available: true,
    })
  
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  });
  
// @desc   Update a product
// @route POST /api/products/:id

const updateUser = asyncHandler(async(req,res) => {
    const {id,first_name,last_name,email,gender,avatar,domain} = req.body;

    const user = await User.findById(req.params.id)

    if(user)
    {
        user.id = id,
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.gender = gender;
        user.avatar = avatar;
        user.domain = domain;

        const updatedUser = await user.save();
        res.json(updatedUser);
    }else{
        res.status(404);
        throw new Error('resource not found')
    }
});

export {getUsers,deleteUser,createUser,updateUser,getUserById};
