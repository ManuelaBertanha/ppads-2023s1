package br.mack.ads.apipresencajpa.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "turma")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    private String nomeTurma;
    private int anoTurma;

    public Turma() {}

    public Turma(String nomeTurma, int anoTurma) {
        this.nomeTurma = nomeTurma;
        this.anoTurma = anoTurma;
    }

    /**
	 * @return the id
	 */
    public long getId() {
        return id;
    }

    /**
	 * @param id the id to set
	 */
    public void setId(long id) {
        this.id = id;
    }
    
    public String getNomeTurma() {
        return nomeTurma;
    }

    public void setNomeTurma(String nomeTurma) {
        this.nomeTurma = nomeTurma;
    }

    public int getAnoTurma() {
        return anoTurma;
    }

    public void setAnoTurma(int anoTurma) {
        this.anoTurma = anoTurma;
    }
}
