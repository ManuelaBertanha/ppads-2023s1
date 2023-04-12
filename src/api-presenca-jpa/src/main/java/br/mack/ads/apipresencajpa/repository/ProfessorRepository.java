package br.mack.ads.apipresencajpa.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import br.mack.ads.apipresencajpa.entities.Professor;

public interface ProfessorRepository extends JpaRepository <Professor, Long> {

    List<Professor> findByNomeProfessorContaining(String nomeProfessor);
    public List<Professor> findByTurmaId(Long id);
    
}