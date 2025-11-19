import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { motion } from 'motion/react'

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts'

type data = {
  session: string
  wpm?: number
  comprehension: number
}

type Props = {
  progressData: data[]
  title: string
  xDataKey: string
  yDataKey: string
}
export const ProgressChart = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-64 '>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={props.progressData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey={props.yDataKey} stroke='#6b7280' />
                <YAxis stroke='#6b7280' />
                <Tooltip
                  wrapperClassName=' border-2 border-primary rounded-md'
                  labelClassName='dark:text-gray-800'
                />
                <Area
                  type='monotone'
                  dataKey={'wpm'}
                  stroke='#4f46e5'
                  fill='rgba(21, 11, 213, 0.4)'
                  strokeWidth={3}
                  dot={{ fill: '#4f46e5', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Area
                  type='monotone'
                  dataKey={'comprehension'}
                  stroke='#ab46e5'
                  fill='rgba(129, 1, 203, 0.4)'
                  strokeWidth={3}
                  dot={{ fill: '#ab46e5', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
