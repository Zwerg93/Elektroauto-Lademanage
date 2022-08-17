package at.htl;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileNotFoundException;
import java.util.List;

@Path("/csv2")
public class CSVResource {

    CSVRepository cr = new CSVRepository();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCSV() throws FileNotFoundException {
        System.out.println(cr.readCSV());
        return Response.ok(cr.readCSV()).build();
    }
}
