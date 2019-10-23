import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));
export default function FAQ() {
    const classes = useStyles();
    return (
        <div className="card card-body mt-4 mb-4">
            <div style={{ marginBottom: "30px" }}>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Q: What if I don't want to give an exact location?
        </Typography>
                    <Typography component="p">
                        A: Not a problem! Give as much, or as little location information as you'd like. We just ask that you give us at least a city/region and country, since the purpose of this site is to see stories located around the world.
        </Typography>
                </Paper>
            </div>
            <div style={{ marginBottom: "30px" }}>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Q: I'm straight, but have a lot of LGBTQ friends. Can I post stories too?
        </Typography>
                    <Typography component="p">
                        A: Of course, as long as it has something to do with your connection to LGBTQ communities or individuals.
        </Typography>
                </Paper>
            </div>

            <div style={{ marginBottom: "30px" }}>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Q: How long or short do stories have to be?
        </Typography>
                    <Typography component="p">
                        A: As long or as short as you want them to be.
        </Typography>
                </Paper>
            </div>

            <div style={{ marginBottom: "30px" }}>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3">
                        Q: What do the different color pins mean?
        </Typography>
                    <Typography component="p">
                        A: Lavender/purple pins are personal stories. Green pins are community histories, or stories that have significance to LGBTQ communities on a scale larger than the individual. For example, Stonewall would be considered a community story, as would, say, the legalization of gay marriage in California, or the first lesbian couple to get married (quite publically) in Taiwan. Red pins are current locations of active organizations and resources for LGBTQ individuals.
        </Typography>
                </Paper>
            </div>
        </div >
    )
}
