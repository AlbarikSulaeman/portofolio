export const getTheme = () => {
  const theme = process.env.NEXT_PUBLIC_THEME_COLOR || 'woody';
  if (theme === 'woody') {
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      accent: 'bg-amber-100',
      button: 'bg-amber-800 text-white hover:bg-amber-700',
      border: 'border-amber-300',
      card: 'bg-white border border-amber-200 shadow-md',
    };
  }
  return {
    bg: 'bg-gray-50',
    text: 'text-gray-900',
    accent: 'bg-gray-100',
    button: 'bg-gray-800 text-white hover:bg-gray-700',
    border: 'border-gray-300',
    card: 'bg-white border border-gray-200 shadow-md',
  };
};