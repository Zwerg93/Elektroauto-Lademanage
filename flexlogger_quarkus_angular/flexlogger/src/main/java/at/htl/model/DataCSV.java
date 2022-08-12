package at.htl.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class DataCSV {
    @Id
    @GeneratedValue
    int id;

    String path;
    Date creationDate;
}
