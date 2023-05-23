package br.mack.ads.apipresencajpa.repository;

import java.util.List;
import java.util.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import br.mack.ads.apipresencajpa.entities.Presenca;

public interface PresencaRepository extends JpaRepository <Presenca, Long> {

    List<Presenca> findByDataPresencaContaining(Calendar dataPresenca);
    public List<Presenca> findByAlunoId(Long id);

}
