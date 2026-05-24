const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// 1. Tính điểm trung bình và xếp loại cho mỗi sinh viên
const studentResults = [];

for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = student.math * 0.4 + student.physics * 0.3 + student.cs * 0.3;
    
    let classification;
    if (average >= 8.0) {
        classification = "Giỏi";
    } else if (average >= 6.5) {
        classification = "Khá";
    } else if (average >= 5.0) {
        classification = "Trung bình";
    } else {
        classification = "Yếu";
    }
    
    studentResults.push({
        name: student.name,
        average: Math.round(average * 10) / 10,
        classification: classification,
        gender: student.gender
    });
}



// 3. Đếm số SV mỗi xếp loại
let excellentCount = 0;
let goodCount = 0;
let averageCount = 0;
let poorCount = 0;

for (let i = 0; i < studentResults.length; i++) {
    if (studentResults[i].classification === "Giỏi") {
        excellentCount++;
    } else if (studentResults[i].classification === "Khá") {
        goodCount++;
    } else if (studentResults[i].classification === "Trung bình") {
        averageCount++;
    } else if (studentResults[i].classification === "Yếu") {
        poorCount++;
    }
}

// 4. Tìm SV có điểm TB cao nhất và thấp nhất
let maxStudent = studentResults[0];
let minStudent = studentResults[0];

for (let i = 1; i < studentResults.length; i++) {
    if (studentResults[i].average > maxStudent.average) {
        maxStudent = studentResults[i];
    }
    if (studentResults[i].average < minStudent.average) {
        minStudent = studentResults[i];
    }
}

// 5. Tính điểm TB toàn lớp cho từng môn
let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

for (let i = 0; i < students.length; i++) {
    totalMath += students[i].math;
    totalPhysics += students[i].physics;
    totalCS += students[i].cs;
}

const avgMath = Math.round((totalMath / students.length) * 10) / 10;
const avgPhysics = Math.round((totalPhysics / students.length) * 10) / 10;
const avgCS = Math.round((totalCS / students.length) * 10) / 10;

// Bonus: Tính điểm TB theo giới tính
let maleCount = 0;
let femaleCount = 0;
let maleAvgScore = 0;
let femaleAvgScore = 0;

for (let i = 0; i < studentResults.length; i++) {
    if (studentResults[i].gender === "M") {
        maleCount++;
        maleAvgScore += studentResults[i].average;
    } else if (studentResults[i].gender === "F") {
        femaleCount++;
        femaleAvgScore += studentResults[i].average;
    }
}

const maleAverage = Math.round((maleAvgScore / maleCount) * 10) / 10;
const femaleAverage = Math.round((femaleAvgScore / femaleCount) * 10) / 10;
