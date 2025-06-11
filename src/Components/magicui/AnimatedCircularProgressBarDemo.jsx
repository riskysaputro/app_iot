import React from 'react';

export default function AnimatedCircularProgressBar({ value = 0, max = 100, min = 0, size = 120, strokeWidth = 10, gaugePrimaryColor = 'blue', gaugeSecondaryColor = '#eee' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(value, min), max);
  // const percentage = ((normalizedValue - min) / (max - min)) * 100;
  const percentage = ((max - normalizedValue) / (max - min)) * 100;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle stroke={gaugeSecondaryColor} fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />
      <circle
        stroke={gaugePrimaryColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="#333">
        {Math.round(percentage)}%
      </text>
    </svg>
  );
}
