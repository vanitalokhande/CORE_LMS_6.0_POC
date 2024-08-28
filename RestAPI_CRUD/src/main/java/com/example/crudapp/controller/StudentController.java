package com.example.crudapp.controller;

import com.example.crudapp.entity.Student;
import com.example.crudapp.exception.StudentNotFoundException;
import com.example.crudapp.response.apiResponse;
import com.example.crudapp.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student student) {
        if (studentService.getStudentById(id).isPresent()) {
            student.setId(id);
            return ResponseEntity.ok(studentService.saveStudent(student));
        } else {
            return ResponseEntity.notFound().build();
        }
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<apiResponse> deleteStudent(@PathVariable Long id) {
        try {
            studentService.deleteStudent(id);
            apiResponse response = new apiResponse("Student deleted successfully", null);
            return ResponseEntity.ok(response);
        } catch (StudentNotFoundException e) {
            apiResponse response = new apiResponse(e.getMessage(), null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            apiResponse response = new apiResponse("An unexpected error occurred", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
