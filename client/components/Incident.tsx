import { colors } from "@/themes/colors";
import { TIncident } from "@/types";
import moment from "moment";
import { MotiView } from "moti";
import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Incident({ incident }: { incident: TIncident }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1 }}
      style={{
        backgroundColor:
          String(incident.category) == "Information"
            ? `${colors.brandColor}0F`
            : String(incident.category) == "Warning"
              ? `${colors.warningColor}0F`
              : `${colors.dangerColor}0F`,
        borderColor:
          String(incident.category) == "Information"
            ? `${colors.brandColor}0A`
            : String(incident.category) == "Warning"
              ? `${colors.warningColor}0A`
              : `${colors.dangerColor}0A`,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        gap: 10,
        margin: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      key={incident.id}
    >
      <View>
        {String(incident.category) == "Information" ? (
          <Svg
            width={42}
            height={42}
            fill={colors.brandColor}
            viewBox="0 0 640 640"
          >
            <Path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z" />
          </Svg>
        ) : String(incident.category) == "Urgent" ? (
          <View
            style={{
              backgroundColor: colors.dangerColor,
              borderRadius: 100,
              padding: 5,
            }}
          >
            <Svg width={26} fill={"white"} height={26} viewBox="0 0 640 640">
              <Path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z" />
            </Svg>
          </View>
        ) : (
          String(incident.category) == "Warning" && (
            <View
              style={{
                backgroundColor: colors.warningColor,
                borderRadius: 100,
                padding: 5,
              }}
            >
              <Svg width={26} fill={"white"} height={26} viewBox="0 0 640 640">
                <Path d="M320 64C334.7 64 348.2 72.1 355.2 85L571.2 485C577.9 497.4 577.6 512.4 570.4 524.5C563.2 536.6 550.1 544 536 544L104 544C89.9 544 76.8 536.6 69.6 524.5C62.4 512.4 62.1 497.4 68.8 485L284.8 85C291.8 72.1 305.3 64 320 64zM320 416C302.3 416 288 430.3 288 448C288 465.7 302.3 480 320 480C337.7 480 352 465.7 352 448C352 430.3 337.7 416 320 416zM320 224C301.8 224 287.3 239.5 288.6 257.7L296 361.7C296.9 374.2 307.4 384 319.9 384C332.5 384 342.9 374.3 343.8 361.7L351.2 257.7C352.5 239.5 338.1 224 319.8 224z" />
              </Svg>
            </View>
          )
        )}
      </View>
      <View style={{ gap: 5, width: "80%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "500" }}>{incident.title}</Text>
          <Text style={{ color: colors.secondaryText }}>
            {moment(incident.occurredAt).fromNow()}
          </Text>
        </View>
        <Text>{incident.description}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 5,
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
          >
            <Text style={{ textTransform: "capitalize" }}>
              {String(incident.child.name.split(" ")[0].toLocaleLowerCase())}
            </Text>
          </View>
          <View
            style={{
              backgroundColor:
                String(incident.category) == "Information"
                  ? colors.brandColor
                  : String(incident.category) == "Warning"
                    ? colors.warningColor
                    : colors.dangerColor,
              padding: 5,
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: "white" }}>{incident.category}</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 5,
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
          >
            <Text style={{ textTransform: "capitalize" }}>
              Severity: {incident.severity}
            </Text>
          </View>
        </View>
      </View>
    </MotiView>
  );
}
