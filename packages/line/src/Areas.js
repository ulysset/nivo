/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useMotionConfig, SmartMotion, blendModePropType } from '@nivo/core'
import { rgb as d3Color } from 'd3-color'

const Areas = ({ areaGenerator, areaOpacity, areaBlendMode, lines, areaBrightness }) => {
    const { animate, springConfig } = useMotionConfig()

    if (animate !== true) {
        return (
            <g>
                {lines
                    .slice(0)
                    .reverse()
                    .map(({ id, data, color }) => (
                        <path
                            key={id}
                            d={areaGenerator(data.map(d => d.position))}
                            fill={d3Color(color)
                                .copy({ opacity: areaBrightness })
                                .toString()}
                            fillOpacity={areaOpacity}
                            strokeWidth={0}
                            style={{
                                mixBlendMode: areaBlendMode,
                            }}
                        />
                    ))}
            </g>
        )
    }

    return (
        <g>
            {lines
                .slice(0)
                .reverse()
                .map(({ id, data, color }) => (
                    <SmartMotion
                        key={id}
                        style={spring => ({
                            d: spring(areaGenerator(data.map(d => d.position)), springConfig),
                            fill: spring(color, springConfig),
                        })}
                    >
                        {style => (
                            <path
                                key={id}
                                d={style.d}
                                fill={d3Color(color)
                                    .brighter(areaBrightness)
                                    .toString()}
                                fillOpacity={areaOpacity}
                                strokeWidth={0}
                                style={{ mixBlendMode: areaBlendMode }}
                            />
                        )}
                    </SmartMotion>
                ))}
        </g>
    )
}

Areas.propTypes = {
    areaGenerator: PropTypes.func.isRequired,
    areaOpacity: PropTypes.number.isRequired,
    areaBlendMode: blendModePropType.isRequired,
    lines: PropTypes.arrayOf(PropTypes.object).isRequired,
    areaBrightness: PropTypes.number.isRequired,
}

export default memo(Areas)
