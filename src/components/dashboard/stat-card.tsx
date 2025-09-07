import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  icon?: string;
  description?: string;
}

export function StatCard({ title, value, change, icon, description }: StatCardProps) {
  const getChangeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getChangeIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      case 'neutral': return '➡️';
      default: return '';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-500">
                {description}
              </p>
            )}
            {change && (
              <div className={`flex items-center text-xs mt-2 ${getChangeColor(change.type)}`}>
                <span className="mr-1">{getChangeIcon(change.type)}</span>
                <span className="font-medium">{Math.abs(change.value)}% {change.label}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-3xl opacity-80">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}