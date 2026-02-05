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
              : String(incident.category) == "Urgent"
                ? `${colors.dangerColor}0F`
                : `${colors.positiveColor}0F`,
        borderColor:
          String(incident.category) == "Information"
            ? `${colors.brandColor}0A`
            : String(incident.category) == "Warning"
              ? `${colors.warningColor}0A`
              : String(incident.category) == "Urgent"
                ? `${colors.dangerColor}0A`
                : `${colors.positiveColor}0A`,
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
        ) : String(incident.category) == "Warning" ? (
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
        ) : (
          String(incident.category) == "Positive" && (
            <View
              style={{
                backgroundColor: colors.positiveColor,
                borderRadius: 100,
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Svg width={24} height={24} fill={"white"} viewBox="0 0 640 640">
                <Path d="M235.5 102.8C256.3 68 300.5 54 338 71.6L345.2 75.4C380 96.3 394 140.5 376.4 178L376.4 178L362.3 208L472 208L479.4 208.4C515.7 212.1 544 242.8 544 280C544 293.2 540.4 305.4 534.2 316C540.3 326.6 543.9 338.8 544 352C544 370.3 537.1 386.8 526 399.5C527.3 404.8 528 410.3 528 416C528 441.1 515.1 463 495.8 475.9C493.9 511.4 466.4 540.1 431.4 543.6L424 544L319.9 544C301.9 544 284 540.6 267.3 534.1L260.2 531.1L259.5 530.8L252.9 527.6L252.2 527.3L240 520.8C227.7 514.3 216.7 506.1 207.1 496.7C203 523.6 179.8 544.1 151.8 544.1L119.8 544.1C88.9 544.1 63.8 519 63.8 488.1L64 264C64 233.1 89.1 208 120 208L152 208C162.8 208 172.9 211.1 181.5 216.5L231.6 110L232.2 108.8L234.9 103.8L235.5 102.9zM120 256C115.6 256 112 259.6 112 264L112 488C112 492.4 115.6 496 120 496L152 496C156.4 496 160 492.4 160 488L160 264C160 259.6 156.4 256 152 256L120 256zM317.6 115C302.8 108.1 285.3 113.4 276.9 127L274.7 131L217.9 251.9C214.4 259.4 212.4 267.4 211.9 275.6L211.8 279.8L211.8 392.7L212 400.6C214.4 433.3 233.4 462.7 262.7 478.3L274.2 484.4L280.5 487.5C292.9 493.1 306.3 496 319.9 496L424 496L426.4 495.9C438.5 494.7 448 484.4 448 472L447.8 469.4C447.7 468.5 447.6 467.7 447.4 466.8C444.7 454.7 451.7 442.6 463.4 438.8C473.1 435.7 480 426.6 480 416C480 411.7 478.9 407.8 476.9 404.2C470.6 393.1 474.1 379 484.9 372.2C491.7 367.9 496.1 360.4 496.1 352C496.1 344.9 493 338.5 487.9 334C482.7 329.4 479.7 322.9 479.7 316C479.7 309.1 482.7 302.6 487.9 298C493 293.5 496.1 287.1 496.1 280L496 277.6C494.9 266.3 485.9 257.3 474.6 256.2L472.2 256.1L324.7 256.1C316.5 256.1 308.9 251.9 304.5 245C300.1 238.1 299.5 229.3 303 221.9L333 157.6C340 142.6 334.4 124.9 320.5 116.6L317.6 115z" />
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
                    : String(incident.category) == "Urgent"
                      ? colors.dangerColor
                      : colors.positiveColor,
              padding: 5,
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: "white" }}>{incident.category}</Text>
          </View>
          {incident.type.toString() == "negative" && (
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
          )}
        </View>
      </View>
    </MotiView>
  );
}
