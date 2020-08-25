import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUsers, setFilterResults} from "../../Redux/MainReducer";
import UserItem from "./UserItem/UserItem";
import styled from "styled-components";

const StyledUsers = styled.div`
    position: relative;
    font-size: 24px;
    color: #000;
    margin-bottom: 20px;
  `
const StyledUsersList = styled.div`
    max-width: 1200px;
    background-color: #c8fbff;
    border-radius: 0 0 4px 4px;
    font-size: 24px;
    color: #000;
    padding: 40px 20px;
    margin: auto auto 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `
export const SearchInput = styled.div`
    position: relative;
    max-width: 1200px;
    margin: auto;
    svg{
      position: absolute;
      width: 30px;
      fill: #212121;
      top: 8px;
      left: 8px;
    }
`;
export const StyledInput = styled.input`
    display: block;
    padding: 12px 10px 12px 46px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    width: 100%;
    border: none;
    border-radius: 4px 4px 0 0;
    outline: none;
`;


const Users = (props) => {
    const dispatch = useDispatch();
    const getUsersThunk = useCallback((token) => dispatch(getUsers(token)), [dispatch]);

    const token = useSelector(state => state.authState.token);
    const users = useSelector(state => state.usersState.users);
    const usersFiltered = useSelector(state => state.usersState.usersFilter);

    let [inputValue, setValue] = useState("")
    const setFilterResultsDispatch = useCallback((inputValue) => {
        dispatch(setFilterResults(inputValue))
    }, [dispatch]);

    const onTermInput = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
            if (token) {
                getUsersThunk(token)
            }
        }, [token, getUsersThunk]
    )

    useEffect(() => {
        setFilterResultsDispatch(inputValue);
    }, [setFilterResultsDispatch, inputValue])

    return <StyledUsers>
        <div className="filter">
            <SearchInput>
                <svg className="svg-icon" viewBox="0 0 20 20">
                    <path
                        d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                </svg>
                <StyledInput onChange={onTermInput} type="text" value={inputValue}
                             placeholder={"Enter your search term..."}/>
            </SearchInput>
        </div>
        <StyledUsersList>
            {users.length === 0 ? "LOADING..." :
                usersFiltered.length === 0 && inputValue.length === 0 ?
                    users.map(i => <UserItem key={i.id} {...props} {...i}/>)
                    : usersFiltered.map(i => <UserItem key={i.id} {...props} {...i}/>)}
            {usersFiltered.length === 0 && inputValue.length !== 0 ? "NO RESULTS" : null}
        </StyledUsersList>
    </StyledUsers>
};

export default Users;