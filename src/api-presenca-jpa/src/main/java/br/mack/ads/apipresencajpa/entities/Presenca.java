package br.mack.ads.apipresencajpa.entities;

import jakarta.persistence.*;

import java.util.Calendar;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "presenca")
public class Presenca {

    @Id
    @GeneratedValue (strategy = GenerationType.SEQUENCE)
    private long id;
    private boolean falta;
    private Calendar dataPresenca;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "aluno_id", nullable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Aluno aluno;
    
    public Presenca(){}
    
    public Presenca(boolean falta) {
        this.falta = falta;
        dataPresenca = Calendar.getInstance();
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

    public boolean getFalta() {
        return falta;
    }

    public void setFalta(boolean falta) {
        this.falta = falta;
    }

    public Calendar getDataPresenca(){
        return dataPresenca;
    }

    public void setDataPresenca(Calendar dataPresenca){
        this.dataPresenca = dataPresenca;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }
}
