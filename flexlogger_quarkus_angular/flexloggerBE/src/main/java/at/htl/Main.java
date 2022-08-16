package at.htl;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) throws FileNotFoundException {
        CSVRepository cr = new CSVRepository();
        cr.readCSV();
    }
}
