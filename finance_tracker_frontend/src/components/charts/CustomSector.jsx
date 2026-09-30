import { Pie, PieChart, Sector } from "recharts";

const CustomSector = (props) => {
    const { payload } = props;

    return (
        <Sector
            {...props}
            fill={payload.categoryColor}
        />
    );
};

export default CustomSector;