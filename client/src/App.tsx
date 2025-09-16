import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

function App() {
  const [message, setMessage] = useState('')
  const [healthData, setHealthData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    setIsLoading(true)
    setError('')
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

    try {
      // Fetch both endpoints
      const [helloResponse, healthResponse] = await Promise.all([
        fetch(`${apiUrl}/api/hello`),
        fetch(`${apiUrl}/api/health`)
      ])

      const helloData = await helloResponse.json()
      const healthData = await healthResponse.json()

      setMessage(helloData.message)
      setHealthData(healthData)
    } catch (err) {
      console.error('Error fetching from server:', err)
      setError('Error connecting to server')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-slate-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            React + Express App
            {!isLoading && !error && (
              <Badge variant="secondary" className="text-xs text-slate-600">
                Connected
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-slate-600">
            Full-stack TypeScript application with shadcn/ui components
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2 text-slate-700">Server Message</h3>
            {isLoading ? (
              <Skeleton className="h-4 w-3/4" />
            ) : error ? (
              <p className="text-slate-600 text-sm bg-slate-50 p-3 rounded-md border border-slate-200">{error}</p>
            ) : (
              <p className="text-sm bg-slate-100 text-slate-700 p-3 rounded-md border border-slate-200">{message}</p>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2 text-slate-700">Server Health</h3>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ) : healthData ? (
              <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-md border border-slate-200">
                <p className="text-slate-600"><span className="font-medium text-slate-700">Status:</span> {healthData.message}</p>
                <p className="text-slate-600"><span className="font-medium text-slate-700">Timestamp:</span> {new Date(healthData.timestamp).toLocaleString()}</p>
              </div>
            ) : null}
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={fetchData} disabled={isLoading} className="w-full" variant="secondary">
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
