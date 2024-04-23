import asyncHandler from '../middleware/asyncHandler.js';
import Category from "../models/categoryModel.js";
import APIFilters from "../utils/apiFilters.js";
import Product from '../models/productModel.js'

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  // const resPerPage = 4;
  // let categories 
 
  // const apiFilters = new APIFilters(Category, req.query).search().filters();

  
  // let filteredCategoriesCount = categories.length;

  // categories = await apiFilters.query.clone();

    const categories = await Category.find()
    res.status(200).json({
     status: "success",
      categories,
    });


})




// @desc    Create a category
// @route   POST /api/category
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    const category = new Category({
        name: name?.toLowerCase(),
        // user: req.user._id,
        image: '/img/sample.jpg',
    });

    const createdCategory = await category.save();
    message: "Category created successfully"
    res.status(201).json(createdCategory);
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
 const getSingleCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      message: "Category fetched successfully",
      category,
    });
  });
  // @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name, image } =  req.body;
     
   const category = await Category.findById(req?.params?.id) 
  
   if (category) {

    category.name = req.body.name || category.name
    category.image = req.body.image || category.image

const updatedCategory = await category.save()

res.json({
  name: updatedCategory.name,
  image: updatedCategory.image
})
   } else {
   res.status(404)
   throw new Error('Product not found')
  }   
})

export {
    createCategory,
    getCategories,
    getSingleCategory,
    updateCategory
  }

