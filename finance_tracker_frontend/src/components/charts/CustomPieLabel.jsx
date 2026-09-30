const CustomPieLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    innerRadius,
    percent,
}) => {
    if (percent < 0.05) return null; // Dont render label under 5%

    const RADIAN = Math.PI / 180;

    const radius = innerRadius + (outerRadius - innerRadius) / 2;

    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            className="text-xs text-semibold"
        >
            {(percent * 100).toFixed(0)} %
        </text>
    );
};

export default CustomPieLabel;