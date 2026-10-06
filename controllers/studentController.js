const Student = require("../models/students");

exports.getStudents = async (req, res, next) => {
    try {
        const { branch, sort } = req.query;
        let query = Student.find();
        if (branch) {
            query = query.find({ branch: branch });
        }
        if (sort === "marks") {
            query = query.sort({ marks: 1 });
        }
        const students = await query;
        res.status(200).json(students);
    } catch (err) {
        next(err);
    }
};

exports.getStudentById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

exports.createStudent = async (req, res, next) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        next(err);
    }
};

exports.updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await Student.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(200).json(student);
    } catch (err) {
        next(err);
    }
};

exports.deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }
        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (err) {
        next(err);
    }
};