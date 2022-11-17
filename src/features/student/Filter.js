import { useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import { selectAllStudents, setFilter, clearFilter, filterStudents } from './studentSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const { classes, filter, students } = useSelector(selectAllStudents);

  const handleFilterSet = async (course) => {
    dispatch(setFilter(course))
  }

  const handleClearFilter = () => {
    dispatch(clearFilter())
  }

  useEffect(() => {
    dispatch(filterStudents(students, filter))
  }, [filter])

    return (
        <Dropdown>
          <DropdownButton variant='secondary' title='Class Filter'>
            { classes.map(course => (
              <Dropdown.Item
              key={course}
              active={course === filter}
              onClick={() => handleFilterSet(course)}
              >
                { course }
              </Dropdown.Item>
            ))}
            <Dropdown.Item
            key="clear"
            onClick={() => handleClearFilter()}
            >clear all</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
    )
}

export default Filter;
