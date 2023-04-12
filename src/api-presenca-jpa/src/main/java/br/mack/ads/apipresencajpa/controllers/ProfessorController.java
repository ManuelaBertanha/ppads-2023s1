package br.mack.ads.apipresencajpa.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.mack.ads.apipresencajpa.entities.Professor;
import br.mack.ads.apipresencajpa.repository.ProfessorRepository;
import br.mack.ads.apipresencajpa.entities.Turma;
import br.mack.ads.apipresencajpa.repository.TurmaRepository;

@RestController
@RequestMapping("/api")
public class ProfessorController {

    @Autowired
    ProfessorRepository professorRepository;

    @Autowired
    TurmaRepository turmaRepository;
    
    @PostMapping("/turmas/{turmaId}/professor")
    public ResponseEntity<Professor> create(@PathVariable("turmaId") long turmaId, @RequestBody Professor professor) {
        Turma turma = turmaRepository.findById(turmaId).orElseThrow( () -> new ResponseStatusException(HttpStatus.NOT_FOUND) );
        professor.setTurma(turma);
        Professor _professor = professorRepository.save(professor);
        return new ResponseEntity<>(_professor, HttpStatus.CREATED);
    }

    @GetMapping("/professores")
    public ResponseEntity<List<Professor>> read() {
        List<Professor> professores = professorRepository.findAll();
        return new ResponseEntity<>(professores, HttpStatus.OK);
    }

    @GetMapping("/turmas/{turmaId}/professores")
    public ResponseEntity<List<Professor>> readByTurmaId(@PathVariable("turmaId") long turmaId) {
        List<Professor> professores = professorRepository.findByTurmaId(turmaId);
        return new ResponseEntity<>(professores, HttpStatus.OK);
    }

    @DeleteMapping("/professores/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        professorRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/professores/{id}")
    public Professor update(@RequestBody Professor turma, @PathVariable long id) {
        Optional<Professor> op = this.professorRepository.findById(id);
        if (op.isPresent()) {

            Professor s = op.get();

            String nomeProfessor = turma.getNomeProfessor();
            String nomeDisciplina = turma.getNomeDisciplina();

            
            if (nomeProfessor != null) s.setNomeProfessor(nomeProfessor);
            if (nomeDisciplina != null) s.setNomeDisciplina(nomeDisciplina);
            
            this.professorRepository.save(s);
            return s;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
