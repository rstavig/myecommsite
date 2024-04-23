import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema(
{
    name: {
        type: String,
        trim: true,
        // required: true,
  },
      products: 
        {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        image: {
          type: String,
          // required: true,
        },
        category: {
          type: String,
        }
      
}, 
{timestamps: true}
)

const Category = mongoose.model("Category", categorySchema);

export default Category;