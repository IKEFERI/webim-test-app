import React, {useCallback} from 'react';
import styled from "styled-components";
import {StyledButton, StyledButtonRed} from "../../FormElements/StyledFormElements";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserThunk, setIdEditUser} from "../../../Redux/MainReducer";


const StyledUserItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 19%;
    position:relative;
    background-color: #74ffc7;
    border-radius: 4px;
    font-size: 16px;
    color: #000;
    padding: 40px 20px;
    margin: 20px 10px;
    text-align: left;
    min-width: 260px;
    word-break: break-word;
    div{
      padding: 10px 0;
      border-bottom: dotted #22b12b 2px;
      flex: 1 1 100%;
    }
    .actions{
      display: flex;
      justify-content: space-between;
      border-bottom: none;
      align-self: flex-end;
      button{
        line-height: 1;
        height: 40px;
        padding: 8px 20px;
        margin: 20px 5px 0 5px;
        white-space: nowrap;
        align-self: flex-end;
      }
    }
  `



const UserItem = (props) => {
    const dispatch = useDispatch();
    const setIdEditUserDispatch = useCallback((value)=>dispatch(setIdEditUser(value)),[dispatch]);
    const deleteUserThunkDispatch = useCallback((token, id)=>dispatch(deleteUserThunk(token, id)),[dispatch]);
    const token = useSelector(state => state.authState.token);
    const idItem = props.id;

    const editItem = (id) => {
        console.log(props)
        setIdEditUserDispatch(id);
        props.scrollToForm();
    }
    const deleteItem = (id) => {
        console.log(props)
        deleteUserThunkDispatch(token, id);
    }

    return (
        <StyledUserItem>
            <small>id: {props.id}</small>
            <div className="Username">
                <b>Username:</b> {props.username ? props.username : 'Not specified'}
            </div>
            <div className="FirstName">
                <b>First Name:</b> {props.first_name.length !== 0 ? props.first_name : 'Not specified'}</div>
            <div className="LastName">
                <b>Last Name:</b> {props.last_name !== 0 ? props.last_name : 'Not specified'}</div>
            <div className="isActive">
                <b>Status:</b> {props.is_active ? 'Active' : 'Not active'}
            </div>
            <br/>
            <div className="actions">
                <StyledButton onClick={ ()=> editItem(idItem)} >Edit</StyledButton>
                <StyledButtonRed onClick={ ()=> deleteItem(idItem)} >Delete</StyledButtonRed>
            </div>
        </StyledUserItem>
    );
};

export default UserItem;