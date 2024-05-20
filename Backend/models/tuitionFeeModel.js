const mongoose = require('mongoose');

const tuitionFeeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    student_name: {
        type: String // Field to store the name of the student
    },
    grade_level: {
        type: Number // Field to store the grade level of the student
    },
    amount: {
        type: Number,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }
}, { timestamps: true });

// Add a pre-save hook to populate the student name and grade level
tuitionFeeSchema.pre('save', async function (next) {
    try {
        const student = await mongoose.model('Student').findById(this.student);
        if (student) {
            this.student_name = student.name;
            this.grade_level = student.grade_level;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const TuitionFee = mongoose.model('TuitionFee', tuitionFeeSchema);

module.exports = TuitionFee;