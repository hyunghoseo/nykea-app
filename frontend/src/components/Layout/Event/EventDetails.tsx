import { StyleSheet, View } from "react-native";
import { H2, H3, H6, P } from "@expo/html-elements";
import Calendar from "@/assets/calendar.svg";
import Location from "@/assets/location.svg";
import Fee from "@/assets/fee.svg";
import moment from "moment";
import { CommonAddressComponent, CommonDateTimeComponent } from "@/api/apiSchemas";

import { useTypographyStyles } from "@/hooks/useTypographyStyles";
import { Button, ButtonTypes } from "../Button";


interface EventDetailsProps {
    StartDate: CommonDateTimeComponent;
    EndDate: CommonDateTimeComponent;
    Location: CommonAddressComponent[];
}

export const EventDetails: React.FC<EventDetailsProps> = (props) => {
    const styles = useStyles();
    const { h2, h3, h6, bodyNormal } = useTypographyStyles();

    const getLocation = (location: CommonAddressComponent) => {
        var str = location.Address;
        if (location.AddressDetail) {
            str = str?.concat(", " + location.AddressDetail);
        }
        if (location.City) {
            str = str?.concat(", " + location.City);
        }
        if (location.State) {
            str = str?.concat(", " + location.State);
        }
        if (location.Country) {
            str = str?.concat(", " + location.Country);
        }
        return str;
    }

    return (
        <View style={styles.mainSection}>
            <H3 style={[h3, styles.eventDescription]}>Event Details</H3>
            <View style={styles.subSection}>
                <Calendar style={styles.icon} />
                <View>
                    {props?.StartDate &&
                        <P style={[bodyNormal]}><strong>Starts: </strong>
                            {!props?.StartDate?.Time &&
                                moment(props?.StartDate?.Date).format("ddd, MMM DD")
                            }
                            {props?.StartDate?.Time &&
                                moment(props?.StartDate?.Date + " " + props?.StartDate?.Time).format("ddd, MMM DD • LT")
                                + " " + props?.StartDate?.TimeZone
                            }
                        </P>
                    }
                    {props?.EndDate &&
                        <P style={[bodyNormal]}><strong>Ends: </strong>
                            {!props?.EndDate?.Time &&
                                moment(props?.EndDate?.Date).format("ddd, MMM DD")
                            }
                            {props?.EndDate?.Time &&
                                moment(props?.EndDate?.Date + " "
                                    + props?.EndDate?.Time).format("ddd, MMM DD • LT")
                                + " " + props?.EndDate?.TimeZone
                            }
                        </P>
                    }
                </View>
            </View>
            <View style={styles.subSection}>
                <Location style={styles.icon} />
                <View style={styles.locationList}>
                    {props?.Location?.map(
                        (location: CommonAddressComponent) => (
                            <View style={styles.location}>
                                <P style={bodyNormal}><strong>{location.Label}</strong></P>
                                <P style={bodyNormal}>{getLocation(location)}</P>
                                {location?.AddressURL &&
                                    <Button
                                        type={ButtonTypes.location}
                                        text={"Google Maps"}
                                        url={location.AddressURL}
                                    />
                                }
                            </View>
                        )
                    )}
                </View>
            </View>
        </View>
    );
}

const useStyles = () => {
    return StyleSheet.create({
        mainSection: {
            marginBottom: 48,
            paddingHorizontal: 32,
            width: "100%",
            maxWidth: 674,
        },
        eventDescription: {
            marginBottom: 24,
        },
        subSection: {
            flexDirection: "row",
            marginBottom: 24,
        },
        icon: {
            width: 30,
            height: 42,
            marginRight: 16,
        },
        locationList: {
            flexDirection: "column",
            marginBottom: 24,
        },
        location: {
            marginBottom: 16,
        }
    });
};
