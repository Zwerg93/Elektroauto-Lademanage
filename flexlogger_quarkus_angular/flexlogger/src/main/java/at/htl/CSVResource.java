package at.htl;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.FileNotFoundException;
import java.util.List;

@Path("/csv")
public class CSVResource {
    //@Inject
    //CSVRepository cr;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<String> getCSV() throws FileNotFoundException {
        //return cr.readCSV();
        return null;
    }
}
