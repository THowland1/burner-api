import parser from 'odata-parser';
import pick from 'just-pick';
import sortBy from 'just-sort-by';
import safeGet from 'just-safe-get';
import has from 'just-has';

const NAVIGATION_DELIMITER = '/';

type ODataParams = {
  $filter: $Filter;
  $orderby: Record<string, 'asc' | 'desc'>[];
  $select: string[];
  $skip: number;
  $top: number;
};

type ODataValidate<K extends keyof ODataParams> = <T>(
  data: T[],
  params: Pick<ODataParams, K>
) => void;
type ODataTransform<K extends keyof ODataParams> = <T>(
  data: T[],
  params: Pick<ODataParams, K>
) => T[];

const validateTopAndSkip: ODataValidate<'$top' | '$skip'> = (
  data,
  { $top, $skip }
) => {
  if (typeof $top === 'number' && typeof $skip === 'number') {
    return data;
  }
};
const applyTopAndSkip: ODataTransform<'$top' | '$skip'> = (
  data,
  { $top, $skip }
) => {
  return data.slice($skip, $skip + $top);
};

const validateOrderby: ODataValidate<'$orderby'> = (_, { $orderby }) => {
  if (typeof $orderby !== 'string') {
    throw new Error('$orderby must be a string');
  }
  // TODO - validate against shallow non-prop keys
  // if (has(data[0], $orderby.split(NAVIGATION_DELIMITER))) {
  //   throw new Error('$orderby must only be a key of the object');
  // }
  // TODO - validate against deep non-prop keys
  // if (false) {
  //   throw new Error('$orderby must only be a key of the object');
  // }
};
// TODO  support thenby
const applyOrderby: ODataTransform<'$orderby'> = (data, { $orderby }) => {
  const [prop, order] = Object.entries($orderby[0])[0];
  const dataSortedByAsc = sortBy(data, (o) => safeGet(o, prop));

  return order === 'asc' ? dataSortedByAsc : dataSortedByAsc.reverse();
};

const validateSelect: ODataValidate<'$select'> = (data, { $select }) => {
  if (!Array.isArray($select)) {
    throw new Error('$select must be an array');
  }
  if (!$select.every(($s) => typeof $s === 'string')) {
    throw new Error('$select must be an array of string');
  }
  if (false) {
    throw new Error('$select must only contain keys of the object');
  }
};
const applySelect: ODataTransform<'$select'> = (data, { $select }) => {
  return data.map((arrItem) =>
    pick(arrItem, $select as (keyof typeof arrItem)[])
  );
};

// TODO - Support $filter
const validateFilter: ODataValidate<'$filter'> = (_, { $filter }) => {
  if (typeof $filter !== 'object') {
    throw new Error('$filter must be an object');
  }
};
// TODO - Support $filter
const applyFilter: ODataTransform<'$filter'> = (data, { $filter }) => {
  return data;
};

function parseODataQueryString(odataQueryString: string) {
  const defaults: Partial<ODataParams> = {
    $skip: 0,
    $top: 10,
  };
  // TODO remove non-OData params
  const parsed: Partial<ODataParams> = odataQueryString
    ? parser.parse(odataQueryString)
    : {};

  return { ...defaults, ...parsed };
}

export function applyODataParams<T>(data: T[], odataQueryString: string) {
  const { $filter, $orderby, $select, $skip, $top } =
    parseODataQueryString(odataQueryString);

  let res = [...data];

  if ($orderby !== undefined) {
    validateOrderby(res, { $orderby });
    res = applyOrderby(res, { $orderby });
  }

  if ($select !== undefined) {
    validateSelect(res, { $select });
    res = applySelect(res, { $select });
  }

  if ($filter !== undefined) {
    validateFilter(res, { $filter });
    res = applyFilter(res, { $filter });
  }

  if ($skip !== undefined && $top !== undefined) {
    validateTopAndSkip(res, { $skip, $top });
    res = applyTopAndSkip(res, { $skip, $top });
  }

  return res;
}

type PropertyOperand = {
  type: 'property';
  name: string;
};
type LiteralOperand = {
  type: 'literal';
  value: any;
};
type Operand = PropertyOperand | LiteralOperand;

type EQFilter = {
  type: 'eq';
  left: Operand;
  right: Operand;
};
type LTFilter = {
  type: 'lt';
  left: Operand;
  right: Operand;
};
type GTFilter = {
  type: 'gt';
  left: Operand;
  right: Operand;
};
type LEFilter = {
  type: 'le';
  left: Operand;
  right: Operand;
};
type GEFilter = {
  type: 'ge';
  left: Operand;
  right: Operand;
};
type NEFilter = {
  type: 'ne';
  left: Operand;
  right: Operand;
};
type SubstringofFilter = {
  type: 'functioncall';
  func: 'substringof';
  args: [Operand, Operand];
};
type StartswithFilter = {
  type: 'functioncall';
  func: 'startswith';
  args: [Operand, Operand];
};
type EndswithFilter = {
  type: 'functioncall';
  func: 'endswith';
  args: [Operand, Operand];
};
type AndFilter = {
  type: 'and';
  left: Filter;
  right: Filter;
};
type OrFilter = {
  type: 'or';
  left: Filter;
  right: Filter;
};
type Filter =
  | EQFilter
  | LTFilter
  | GTFilter
  | NEFilter
  | SubstringofFilter
  | AndFilter
  | OrFilter
  | StartswithFilter
  | EndswithFilter;

type $Filter = {
  type: string;
  left: {
    type: string;
    value: string;
  };
};
