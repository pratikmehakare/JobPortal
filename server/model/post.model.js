const mongoose = require('mongoose');

// Create a schema for Job Posting
const jobPostSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  experience: {
    type: String,
    required: true,
    enum: ['0-2 Years', '3-8 Years', '8+ Years'], // Define allowed values for experience
  },
  company: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the string
  },
  emails: {
    type: [String], // Use an array of strings for multiple emails
    required: true,
    validate: {
      validator: function(v) {
        // Basic email validation for each email in the array
        return v.every(email => /.+\@.+\..+/.test(email));
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  endDate: {
    type: Date,
    required: true,
  },
}, { timestamps: true }); // This will add createdAt and updatedAt timestamps

// Create a model from the schema
const JobPost = mongoose.model('JobPost', jobPostSchema);

// Export the model
module.exports = JobPost;
