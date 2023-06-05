import React, {useContext, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import cn from 'classnames'
import NotFound from '../NotFound'
import {getBreadcrumbs} from './utils'
import ProjectCard from './ProjectCard'
import ProjectAbout from './ProjectAbout'
import PoolJoinForm from './PoolJoinForm'
import {get} from 'lodash'
import Breadcrumbs from '../../components/Breadcrumbs'
import {AppContextType} from '../../context/context_types'
import {
  extractAcceptedTokenContract,
  fetchIdoTokenSale,
  fetchProject,
  fetchStakingContract,
  fetchUserTokenBalance,
} from '../../store/actions/project'
import acceptTokenAbi from '../../store/constants/erc20.abi.json'

import style from './ProjectOverview.module.scss'

export default function ProjectOverview(props) {
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  const isRequesting = useSelector(
    (state) => state.project?.project?.requesting,
  )
  const project = useSelector((state) => state.project?.project?.result)
  const extraContractAcceptedTokenAddress = get(
    project,
    'extraContractAcceptedTokenAddress',
    '',
  )
  const smartContractAddress = get(project, 'smartContractAddress', '')
  const accountAddress = useSelector((state) =>
    state.user?.userAccount.accounts ? state.user.userAccount.accounts[0] : '',
  )
  const {id} = props.match.params
  const {setConnectToWalletModalVisible} = useContext(AppContextType)
  useEffect(() => {
    dispatch(fetchProject(id)).then((res) => {
      if (!res) {
        setData({})
        return
      }
      // if (accountAddress) {
      //   res.accountAddress = accountAddress;
      //   const whiteList = get(res, "whitelists", []);
      //   const walletWhiteAddress = whiteList.length > 0 ? whiteList.filter((user) => user.walletAddress.toLowerCase() === accountAddress) : [];
      //   const maxAllocation = walletWhiteAddress && walletWhiteAddress.length > 0 ? walletWhiteAddress[0].maxAllocation : 'N/A';
      //   res.maxAllocation = maxAllocation;
      // }
      setData(res)
    })
    return () => {
      setData({})
    }
  }, [dispatch, id, accountAddress])

  useEffect(() => {
    dispatch(fetchUserTokenBalance(accountAddress))
    if (window.web3 && extraContractAcceptedTokenAddress) {
      const tokenContract = new window.web3.eth.Contract(
        acceptTokenAbi,
        extraContractAcceptedTokenAddress,
      )
      extractAcceptedTokenContract(
        tokenContract,
        smartContractAddress,
        false,
        dispatch,
      )
    }
  }, [
    dispatch,
    smartContractAddress,
    accountAddress,
    extraContractAcceptedTokenAddress,
  ])

  useEffect(() => {
    if (project?.IDOContract && accountAddress)
      dispatch(fetchIdoTokenSale(project?.IDOContract))
    if (project?.stakingContract)
      dispatch(fetchStakingContract(project?.stakingContract))
  }, [accountAddress, dispatch, project?.IDOContract, project?.stakingContract])

  if (!id) {
    return <NotFound />
  }
  return (
    <div className={cn(style.container, 'content content_level_1')}>
      <Breadcrumbs
        wrapperClass={style.breadcrumbs}
        items={getBreadcrumbs(data)}
        loading={isRequesting}
      />
      <ProjectCard
        wrapperClass={style.card}
        data={data}
        loading={isRequesting}
      />
      <div className={style.grid}>
        <ProjectAbout
          wrapperClass={style.about}
          data={data}
          loading={isRequesting}
        />
        <div className={style.formWrapper}>
          <PoolJoinForm
            wrapperClass={style.form}
            data={data}
            loading={isRequesting}
            onConnect={() => setConnectToWalletModalVisible(true)}
          />
        </div>
      </div>
    </div>
  )
}
