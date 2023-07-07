import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailedSpot } from '../../store/spots';

const UpdateSpotForm = () => {
  const { reportId } = useParams();
  const report = useSelector((state) =>
    state.reports ? state.reports[reportId] : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailedSpot(reportId));
  }, [dispatch, reportId]);

  if (!report) return null;

  return (
    <>

    </>
  );
};

export default UpdateSpotForm;
