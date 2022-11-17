import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, ListGroup } from 'react-bootstrap';


import Filter from './Filter';
import {
    fetchStudents,
    selectAllStudents,
    searchStudents
} from './studentSlice';
import styles from './Student.module.css';

const Student = () => {
    const dispatch = useDispatch();
    const { filter, filtered, students, searchResults } = useSelector(selectAllStudents);
    const [search, setSearch] = useState("")

    const handleSearch = (value) => {
        setSearch(value.toLowerCase())
    }

    useEffect(() => {
        dispatch(fetchStudents())
    }, [dispatch])

    useEffect(() => {
        dispatch(searchStudents(students, search))
    }, [search, dispatch, students])

    return(
        <div>
            <h1 className={styles.header}>Students</h1>
            <div className={styles.searchFilter}>
                <Form className={styles.input}>
                    <Form.Control
                    type="text"
                    placeholder="Search students"
                    onChange={event => handleSearch(event.target.value)}
                    >
                    </Form.Control>
                </Form>
                <Filter />
            </div>
            <ListGroup>
                {   searchResults.length !== 0
                    ?
                    filtered === true
                    ?
                    searchResults.map(student => {
                        if(student.classes.includes(filter)) {
                            return (
                                <ListGroup.Item
                                key={student.id}>
                                    {student.firstName + " " + student.lastName}
                                </ListGroup.Item>
                            )
                        }
                    })
                    : searchResults.map(student => {
                        return (
                            <ListGroup.Item
                            key={student.id}>
                                {student.firstName + " " + student.lastName}
                            </ListGroup.Item>
                        )
                    })
                    :
                    students.map(student => {
                        return (
                            <ListGroup.Item
                            key={student.id}>
                                {student.firstName + " " + student.lastName}
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </div>
    )
}

export default Student;
