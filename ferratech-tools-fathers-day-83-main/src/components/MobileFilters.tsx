import { useState } from "react";
import { X, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterCategory {
  id: string;
  title: string;
  type: 'radio' | 'checkbox';
  options: FilterOption[];
}

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterCategory[];
  activeFilters: Record<string, string[]>;
  onApplyFilters: (filters: Record<string, string[]>) => void;
}

const MobileFilters = ({ isOpen, onClose, filters, activeFilters, onApplyFilters }: MobileFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<Record<string, string[]>>(activeFilters);

  const handleFilterChange = (categoryId: string, value: string, type: 'radio' | 'checkbox') => {
    setLocalFilters(prev => {
      if (type === 'radio') {
        return { ...prev, [categoryId]: [value] };
      } else {
        const currentValues = prev[categoryId] || [];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [categoryId]: newValues };
      }
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onApplyFilters({});
    onClose();
  };

  const getActiveFiltersCount = () => {
    return Object.values(localFilters).flat().length;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300`}>
        <div className={`bg-white w-full max-h-[90vh] sm:max-w-md sm:max-h-[80vh] rounded-t-lg sm:rounded-lg shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-0 sm:scale-95'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filtros</h2>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {filters.map((category) => (
              <div key={category.id} className="space-y-3">
                <h3 className="font-medium text-gray-900">{category.title}</h3>
                
                {category.type === 'radio' ? (
                  <RadioGroup
                    value={localFilters[category.id]?.[0] || ''}
                    onValueChange={(value) => handleFilterChange(category.id, value, 'radio')}
                  >
                    {category.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.id} />
                        <Label htmlFor={option.id} className="text-sm">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-2">
                    {category.options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={localFilters[category.id]?.includes(option.value) || false}
                          onCheckedChange={(checked) => 
                            handleFilterChange(category.id, option.value, 'checkbox')
                          }
                        />
                        <Label htmlFor={option.id} className="text-sm">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="flex-1"
              >
                Limpar Filtros
              </Button>
              <Button 
                onClick={handleApplyFilters}
                className="flex-1"
              >
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilters; 