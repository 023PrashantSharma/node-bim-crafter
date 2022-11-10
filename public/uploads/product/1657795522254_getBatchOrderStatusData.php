<?php

public function getBatchOrderStatusData()
{
	$order_token = trim($this->input->post('order_token'));
	
	$where = array('order_token'=>$order_token);
	$joins = array(
		array(
			'table' => $this->tb6,
			'condition' => $this->tb6.'.item_id = '.$this->tb17.'.item_id',
			'jointype' => 'LEFT'
		),
		array(
			'table' => $this->tb3,
			'condition' => $this->tb3.'.article_id = '.$this->tb6.'.article_id',
			'jointype' => 'LEFT'
		),array(
			'table' => $this->tb2,
			'condition' => $this->tb2.'.measuring_unit_id = '.$this->tb3.'.measuring_unit_id',
			'jointype' => 'LEFT'
		)
	);
	$select = 'order_qty,sheet_order_type,btn_standard_value,'.$this->tb2.'.name as measuring_name';
	$getOrderData = $this->Adminamodel->get_joins_where($this->tb17,$select,$joins,$where,);
	
	if(count($getOrderData)>0){
		foreach($getOrderData as $rs){
			$order_qty = $rs->order_qty;
			$sheet_order_type = $rs->sheet_order_type;
			$btn_standard_value = $rs->btn_standard_value;
			$measuring_name = $rs->measuring_name;
		}
	}
	
	if($sheet_order_type == 1){
		$batch_type = 'Sheet Casting';
	}else{
		$batch_type = 'Rod Casting';
	}
	
	$listData = '';
	$sheet_qty=0;
	$turning_qty=0;
	$polishing_qty=0;
	$where1 = array('order_number'=>$order_token,'batch_type'=>1);
	$select = 'SUM(sheetcasting_prepare_qty) as sheetcasting_prepare_qty,SUM('.$this->tb83.'.dye_machine) as dye_machine,COUNT('.$this->tb83.'.dye_machine) as total_machine,SUM('.$this->tb83.'.total_weight) as total_weight';
	$getSheetData = $this->Adminamodel->get_data_columns($this->tb83,$where1,$select);
	$listData.='<tr>';
	if(count($getSheetData)>0){
		foreach($getSheetData as $rs){
			$sheet_qty = $rs->sheetcasting_prepare_qty;
			if($sheet_qty == ""){
				$sheet_qty = 0;
			}else{
				$sheet_qty = $sheet_qty;
			}
			$total_actual = $btn_standard_value * $rs->dye_machine;
			$total_rejection = $total_actual - $sheet_qty;
			$total_prepare_qty = $sheet_qty;
			
			$total_sheet = $rs->dye_machine;
			if($total_sheet == ""){
				$total_sheet = 0;
			}else{
				$total_sheet = $total_sheet;
			}
			
		}
		$listData.='<td>'.$batch_type.'</td><td>'.$order_qty.' '.$measuring_name.'</td><td>'.number_format($total_actual,2).' '.$measuring_name.'</td><td>'.number_format($total_prepare_qty,2).' '.$measuring_name.'</td><td>'.number_format($total_rejection,2).' '.$measuring_name.'</td><td>'.$total_sheet.'</td><td>--</td>';
	}else{
		$listData.='<td>'.$batch_type.'</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>';
	}
	$listData.='</tr><tr>';
	
	$where2 = array('order_number'=>$order_token,'batch_type'=>2);
	$getTurningData = $this->Adminamodel->get_data_columns($this->tb83,$where2,$select);
	if(count($getTurningData)>0){
		foreach($getTurningData as $rs){
			$turning_qty = $rs->sheetcasting_prepare_qty;
			if($turning_qty == ""){
				$turning_qty = 0;
			}else{
				$turning_qty = $turning_qty;
			}
			
			$total_machine = $rs->total_machine;
			if($total_machine != ""){
				$total_machine = $total_machine;
			}else{
				$total_machine = 0;
			}
			
			$total_actual = $sheet_qty;
			$total_rejection = $total_actual - $turning_qty;
			$total_prepare_qty = $turning_qty;
		}
		$listData.='<td>Turning</td><td>'.$order_qty.' '.$measuring_name.'</td><td>'.number_format($total_actual,2).' '.$measuring_name.'</td><td>'.number_format($total_prepare_qty,2).' '.$measuring_name.'</td><td>'.number_format($total_rejection,2).' '.$measuring_name.'</td><td>--</td><td>'.$total_machine.'</td>';
	}else{
		$listData.='<td>Turning</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>';
	}
	$listData.='</tr><tr>';
	
	$where3 = array('order_number'=>$order_token,'batch_type'=>3);
	$getPolishingData = $this->Adminamodel->get_data_columns($this->tb83,$where3,$select);
	if(count($getPolishingData)>0){
		foreach($getPolishingData as $rs){
			$polishing_qty = $rs->sheetcasting_prepare_qty;
			if($polishing_qty == ""){
				$polishing_qty = 0;
			}else{
				$polishing_qty = $polishing_qty;
			}
			$total_actual = $turning_qty;
			$total_rejection = $total_actual - $polishing_qty;
			$total_prepare_qty = $polishing_qty;
		}
		$listData.='<td>Polishing</td><td>'.$order_qty.' '.$measuring_name.'</td><td>'.number_format($total_actual,2).' '.$measuring_name.'</td><td>'.number_format($total_prepare_qty,2).' '.$measuring_name.'</td><td>'.number_format($total_rejection,2).' '.$measuring_name.'</td><td>--</td><td>--</td>';
	}else{
		$listData.='<td>Polishing</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>';
	}
	$listData.='</tr><tr>';
	
	$where4 = array('order_number'=>$order_token,'batch_type'=>4);
	$getPackingData = $this->Adminamodel->get_data_columns($this->tb83,$where4,$select);
	if(count($getPackingData)>0){
		foreach($getPolishingData as $rs){
			$packing_qty = $rs->sheetcasting_prepare_qty;
			if($packing_qty == ""){
				$packing_qty = 0;
			}else{
				$packing_qty = $packing_qty;
			}
			$total_actual = $polishing_qty;
			$total_rejection = $total_actual - $packing_qty;
			$total_prepare_qty = $packing_qty;
		}
		$listData.='<td>Packing</td><td>'.$order_qty.' '.$measuring_name.'</td><td>'.number_format($total_actual,2).' '.$measuring_name.'</td><td>'.number_format($total_prepare_qty,2).' '.$measuring_name.'</td><td>'.number_format($total_rejection,2).' '.$measuring_name.'</td><td>--</td><td>--</td>';
	}else{
		$listData.='<td>Packing</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td>';
	}
	$listData.='</tr><tr>';
	
	$data['listData'] = $listData;
	echo json_encode($data);
}