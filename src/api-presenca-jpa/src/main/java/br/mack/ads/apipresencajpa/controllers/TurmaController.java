package br.mack.ads.apipresencajpa.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import br.mack.ads.apipresencajpa.entities.Turma;
import br.mack.ads.apipresencajpa.repository.TurmaRepository;

@RestController
@RequestMapping("/api")
public class TurmaController {

    @Autowired
    TurmaRepository turmaRepository;
    
    @PostMapping("/turma")
    public ResponseEntity<Turma> create(@RequestBody Turma turma) {
        Turma _turma = turmaRepository.save(turma);
        return new ResponseEntity<>(_turma, HttpStatus.CREATED);
    }

    @GetMapping("/turmas")
    public ResponseEntity<List<Turma>> read() {
        List<Turma> turmas = turmaRepository.findAll();
        return new ResponseEntity<>(turmas, HttpStatus.OK);
    }

    @DeleteMapping("/turmas/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") long id) {
        turmaRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/turmas/{id}")
    public Turma update(@RequestBody Turma turma, @PathVariable long id) {
        Optional<Turma> op = this.turmaRepository.findById(id);
        if (op.isPresent()) {

            Turma s = op.get();

            String nomeTurma = turma.getNomeTurma();
            int anoTurma = turma.getAnoTurma();

            
            if (nomeTurma != null) s.setNomeTurma(nomeTurma);
            if (anoTurma != 0) s.setAnoTurma(anoTurma);
            
            this.turmaRepository.save(s);
            return s;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
}
