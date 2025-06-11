import { sWidth } from "@/constants/dimensions.constant";
import { useTheme } from "@/hooks/useTheme.hook";
import { Stack, Tabs, router, usePathname } from "expo-router";
import React, {
    ReactNode,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { Platform, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Box, { BoxProps } from "./Box";
import ThemedButton from "./ThemedButton";
import ThemedIcon from "./ThemedIcon";
import ThemedText from "./ThemedText";

export function BackButton() {
  const platform = Platform.OS;
  const theme = useTheme();
  return (
    <>
      {router.canGoBack() && (
        <ThemedButton
          type="text"
          onPress={() => {
            router.back();
          }}
          pa={10}
        >
          {platform === "ios" ? (
            <ThemedIcon
              name="chevron-left"
              size={"xxl"}
              color={theme.primary}
            />
          ) : (
            <ThemedIcon name="arrow-left" size={"xl"} color={theme.primary} />
          )}
        </ThemedButton>
      )}
    </>
  );
}

const Page = forwardRef(
  (
    {
      children,
      scrollable = false,
      keyBoardScrollable = false,
      headerComponent,
      ...props
    }: PageProps,
    ref
  ) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleToggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
    };

    const path = usePathname();

    useEffect(() => {
      console.log("Page Rendered: ", props.header?.title);
    }, []);

    const scrollRef = React.useRef<ScrollView>(null);

    function scrollToTop() {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }

    function scrollToBottom() {
      scrollRef.current?.scrollToEnd({ animated: true });
    }

    useImperativeHandle(ref, () => ({
      scrollToTop,
      scrollToBottom,
    }));

    const insets = useSafeAreaInsets();

    const { background: backgroundColor, text: textColor } = useTheme();

    if (headerComponent) {
      if (props.header?.for === "Tab") {
        return (
          <>
            <Tabs.Screen
              options={{
                headerShown: true,
                header: () => (
                  <Box color={backgroundColor} pt={insets.top}>
                    {headerComponent}
                  </Box>
                ),
              }}
            />
            <PageBody scrollable={scrollable} bodyProps={props}>
              {children}
            </PageBody>
          </>
        );
      } else {
        return (
          <>
            <Stack.Screen
              options={{
                headerShown: true,
                header: () => (
                  <Box color={backgroundColor} pt={insets.top}>
                    {headerComponent}
                  </Box>
                ),
              }}
            />
            <PageBody
              scrollable={scrollable}
              keyBoardSrollable={keyBoardScrollable}
              bodyProps={props}
            >
              {children}
            </PageBody>
          </>
        );
      }
    } else {
      if (props.header && props.header.for == "Tab") {
        return (
          <>
            <Tabs.Screen
              options={{
                headerShown: true,
                headerTitle: props.header?.title || "",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor,
                },
                headerTintColor: textColor,
                headerShadowVisible: false,
                headerRight: () => <>{props.header?.rightComponent}</>,
              }}
            />
            <PageBody
              scrollable={scrollable}
              keyBoardSrollable={keyBoardScrollable}
              bodyProps={props}
            >
              {children}
            </PageBody>
          </>
        );
      } else {
        return (
          <>
            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: props.header?.title || "",
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: props.header?.color || backgroundColor,
                },
                headerTintColor: textColor,
                headerShadowVisible: false,
                headerLeft: () => {
                  if (props.header?.disableBackButton) return null;
                  return <BackButton />;
                },
                headerRight: () => <>{props.header?.rightComponent}</>,
              }}
            />
            <PageBody
              scrollable={scrollable}
              keyBoardSrollable={keyBoardScrollable}
              bodyProps={props}
            >
              {children}
            </PageBody>
          </>
        );
      }
    }
  }
);

export default Page;

function PageBody({
  scrollable,
  keyBoardSrollable,
  bodyProps,
  children,
}: {
  scrollable: boolean;
  keyBoardSrollable?: boolean;
  bodyProps?: BoxProps;
  children: ReactNode;
}) {
  const { background: backgroundColor } = useTheme();

  return (
    <>
      {keyBoardSrollable ? (
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Box
            width={sWidth}
            flex={1}
            color={backgroundColor}
            gap={10}
            py={10}
            px={20}
            {...bodyProps}
          >
            {children}
          </Box>
        </KeyboardAwareScrollView>
      ) : (
        <Box flex={1}>
          {scrollable ? (
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <Box
                width={sWidth}
                flex={1}
                color={backgroundColor}
                gap={10}
                py={10}
                px={20}
                {...bodyProps}
              >
                {children}
              </Box>
            </ScrollView>
          ) : (
            <Box
              width={sWidth}
              flex={1}
              color={backgroundColor}
              height={"100%"}
              gap={10}
              py={10}
              px={20}
              {...bodyProps}
            >
              {children}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

interface PageProps extends BoxProps {
  children: ReactNode;
  scrollable?: boolean;
  keyBoardScrollable?: boolean;
  headerComponent?: ReactNode;
  header?: {
    title?: string;
    disableBackButton?: boolean;
    rightComponent?: ReactNode;
    for?: "Stack" | "Drawer" | "Tab";
    headerComponent?: ReactNode;
    color?: string;
  };
  disableHeader?: boolean;
}

export function FancyPageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const theme = useTheme();
  const titleSegments = title.split(" ");
  return (
    <Box gap={20}>
      <ThemedText></ThemedText>
      <Box gap={5}>
        <Box direction="row" wrap="wrap">
          {titleSegments.map((segment, index) => (
            <ThemedText
              key={index}
              size={"xxxl"}
              fontWeight="black"
              textTransform="uppercase"
              color={index % 2 == 0 ? theme.primary : theme.primary2}
            >
              {segment}{" "}
            </ThemedText>
          ))}
        </Box>
        <ThemedText size={"sm"} style={{ opacity: 0.8 }}>
          {description}
        </ThemedText>
      </Box>
    </Box>
  );
} 