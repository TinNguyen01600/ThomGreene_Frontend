import { styled, Box } from "@mui/system";
import { Slider as BaseSlider, sliderClasses } from "@mui/base/Slider";

type Props = {
    range: number[];
    handleChange: (event: Event, newRange: number | number[]) => void;
};

const CustomizedSlider: React.FC<Props> = ({ range, handleChange }) => {
    return (
        <Box sx={{ width: 576, margin: "1vh 2.8vw" }}>
            <p>Price range</p>
            <Slider
                value={range}
                onChange={handleChange}
                slots={{ valueLabel: SliderValueLabel }}
            />
        </Box>
    );
};

interface SliderValueLabelProps {
    children: React.ReactElement;
}

function SliderValueLabel({ children }: SliderValueLabelProps) {
    return (
        <span className="label">
            <div className="value">{children}</div>
        </span>
    );
}

export default CustomizedSlider;

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const Slider = styled(BaseSlider)(
    () => `
  color: ${grey[400]};
  height: 4px;
  width: 100%;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;


  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 8px;
    height: 16px;
    box-sizing: border-box;
    outline: 0;
    background-color: grey;
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 1px ${grey[700]};
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 2px ${grey[900]};
      outline: none;
      transform: scale(1.2);
    }
  }

  & .label {
    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 14px;
    background: unset;
    background-color: #525252;
    width: 32px;
    height: 32px;
    padding: 0px;
    visibility: hidden;
    color: #fff;
    border-radius: 50% 50% 50% 0;
    position: absolute;
    transform: translate(0%, -140%) rotate(-45deg) scale(0);
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :hover .label {
    visibility: visible;
    transform: translate(0%, -140%) rotate(-45deg) scale(1);
  }

  :hover .value {
    transform: rotate(45deg);
    text-align: center;
  }
`
);
