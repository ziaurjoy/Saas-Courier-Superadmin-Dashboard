import React from 'react';
import Image from "next/image";
import image3 from '../../../public/assets/icon/org.jpg';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import AuthService from '../../../services/api/auth.service';
import { getUserData, getUserToken } from '../../../utility/authCheck';
import SwalAlert from '../../common/SwalAlert/SwalAlert';

const CreateOrganization = () => {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const accessToken = getUserToken()

  useEffect(() => {
    const user = getUserData()
    console.log("user", user)
    if (user && user.org_created) {
      SwalAlert("Organization allready Created")
      router.push('/user/dashboard')
    }
  }, [])

  const onSubmit = data => {
    const formData = { schema_name: data.schema_name, organization_name: data.organization_name }
    console.log(formData)
    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' + accessToken
      }
    }

    AuthService.createOrganization(formData,headers).then(
      (data) => {
        if (data) {
          SwalAlert("Organization Created Successfully")
          router.push('/user/dashboard')
        }
        return true;
      },
      (error) => {
        console.log(error?.response?.data?.message);
        return false;
      }
    );

  }

  return <>
    <div className="organization-create-area ">
      <div className="container">
        <div className="row from-content mt-5">
          <div className="col-lg-6 image-area">
            <div className="form-image-wrapper">
              <Image
                src={image3}
                alt=""
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
          </div>
          <div className="col-lg-6 form-area">
            <div className="form-title mb-5">
              <h2>
                Create your <strong>Organization</strong> here!
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="exampleInput1" className="form-label">
                  Organization Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="organization_name"
                  aria-describedby="emailHelp"
                  {...register("organization_name", {
                    required: "Organization Name is required",
                  })}
                />
                {errors.organization_name && errors.organization_name.message && (
                  <span className="error-message">
                    {errors.organization_name.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInput2" className="form-label">
                  Schema Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="schema_name"
                  aria-describedby="emailHelp"
                  {...register("schema_name", {
                    required: "Schema Name is required",
                  })}
                />
                {errors.schema_name && errors.schema_name.message && (
                  <span className="error-message">
                    {errors.schema_name.message}
                  </span>
                )}
              </div>

              <div className="text-center mt-5">
                <button type="submit" className="sign-up-button">
                  Create Organization
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default CreateOrganization;
