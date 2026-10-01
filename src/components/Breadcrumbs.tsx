import { Link, useLocation } from 'react-router-dom';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  let accumulatedPath = '';

  return (
    <nav aria-label="breadcrumb">
      <ol className="text-xs uppercase tracking-wider text-rose-500 font-bold flex list-none gap-2">
        <li className="hover:text-amber-400 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          accumulatedPath += `/${name}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li
              key={accumulatedPath}
              className="hover:text-amber-400 cursor-pointer">
              <span> / </span>
              {isLast ? (
                <span>{decodeURIComponent(name)}</span>
              ) : (
                <Link to={accumulatedPath}>{decodeURIComponent(name)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
