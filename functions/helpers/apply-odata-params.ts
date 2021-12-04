import parser from 'odata-parser';
import pick from 'just-pick';
import sortBy from 'just-sort-by';
import safeGet from 'just-safe-get';
import has from 'just-has';

const NAVIGATION_DELIMITER = '/';

type ODataParams = {
  $filter?: undefined;
  $orderby?: string | undefined;
  $select?: string[];
  $skip?: number;
  $top?: number;
};

function validateTopAndSkip<T>(data: T[], { $top, $skip }: ODataParams) {
  if (typeof $top === 'number' && typeof $skip === 'number') {
    return data;
  }
}
function applyTopAndSkip<T>(data: T[], { $top, $skip }: ODataParams) {
  return data.slice($skip, $skip + $top);
}

function validateOrderby<T>(data: T[], { $orderby }: ODataParams) {
  if (typeof $orderby !== 'string') {
    throw new Error('$orderby must be a string');
  }
  // TODO - validate against shallow non-prop keys
  if (has(data[0], $orderby.split(NAVIGATION_DELIMITER))) {
    throw new Error('$orderby must only be a key of the object');
  }
  // TODO - validate against deep non-prop keys
  if (false) {
    throw new Error('$orderby must only be a key of the object');
  }
}
function applyOrderby<T>(data: T[], { $orderby }: ODataParams) {
  return sortBy(data, (o) => safeGet(o, $orderby));
}

function validateSelect<T>(_: T[], { $select }: ODataParams) {
  if (!Array.isArray($select)) {
    throw new Error('$select must be an array');
  }
  if (!$select.every(($s) => typeof $s === 'string')) {
    throw new Error('$select must be an array of string');
  }
  if (false) {
    throw new Error('$select must only contain keys of the object');
  }
}
function applySelect<T>(data: T[], { $select }: ODataParams) {
  return data.map((arrItem) => pick(arrItem, $select as (keyof T)[]));
}

// TODO - Support $filter
function validateFilter<T>(data: T[], { $filter }: ODataParams) {
  if (typeof $filter !== 'object') {
    throw new Error('$filter must be an object');
  }
}
// TODO - Support $filter
function applyFilter<T>(data: T[], { $filter }: ODataParams) {
  return data;
}

function parseODataQueryString<T>(odataQueryString: string) {
  const odataQueryParams: ODataParams = {
    $filter: undefined,
    $orderby: undefined,
    $select: [],
    $skip: 0,
    $top: 10,
    ...parser.parse(odataQueryString),
  };
  return odataQueryParams;
}

export function applyODataParams<T>(data: T[], odataQueryString: string) {
  const odataQueryParams = parseODataQueryString(odataQueryString);

  let res = [...data];

  validateTopAndSkip(res, odataQueryParams);
  res = applyTopAndSkip(res, odataQueryParams);

  validateOrderby(res, odataQueryParams);
  res = applyOrderby(res, odataQueryParams);

  validateSelect(res, odataQueryParams);
  res = applySelect(res, odataQueryParams);

  validateFilter(res, odataQueryParams);
  res = applyFilter(res, odataQueryParams);

  return res;
}

// type PropertyOperand = {
//   type: "property";
//   name: string;
// };
// type LiteralOperand = {
//   type: "literal";
//   value: any;
// };
// type Operand = PropertyOperand | LiteralOperand;

// type EQFilter = {
//   type: "eq";
//   left: Operand;
//   right: Operand;
// };
// type LTFilter = {
//   type: "lt";
//   left: Operand;
//   right: Operand;
// };
// type GTFilter = {
//   type: "gt";
//   left: Operand;
//   right: Operand;
// };
// type LEFilter = {
//   type: "le";
//   left: Operand;
//   right: Operand;
// };
// type GEFilter = {
//   type: "ge";
//   left: Operand;
//   right: Operand;
// };
// type NEFilter = {
//   type: "ne";
//   left: Operand;
//   right: Operand;
// };
// type SubstringofFilter = {
//   type: "functioncall";
//   func: "substringof";
//   args: [Operand, Operand];
// };
// type StartswithFilter = {
//   type: "functioncall";
//   func: "startswith";
//   args: [Operand, Operand];
// };
// type EndswithFilter = {
//   type: "functioncall";
//   func: "endswith";
//   args: [Operand, Operand];
// };
// type AndFilter = {
//   type: "and";
//   left: Filter;
//   right: Filter;
// };
// type OrFilter = {
//   type: "or";
//   left: Filter;
//   right: Filter;
// };
// type Filter =
//   | EQFilter
//   | LTFilter
//   | GTFilter
//   | SubstringofFilter
//   | AndFilter
//   | OrFilter;

// type $Filter = {
//   type: string;
//   left: {
//     type: string;
//     value: string;
//   };
// };
